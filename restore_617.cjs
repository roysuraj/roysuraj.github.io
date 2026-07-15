const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\suraj\\.gemini\\antigravity\\brain\\06f3c725-6153-422e-aa32-3cbbdb5bcda8\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

let successCount = 0;
let failCount = 0;

for (const line of lines) {
    const entry = JSON.parse(line);
    const createdAt = new Date(entry.created_at);
    // 6:17 PM IST is 12:47 UTC. We include everything up to 12:48 UTC.
    const cutoff = new Date('2026-07-14T12:48:00Z');
    
    if (createdAt > cutoff) {
        break;
    }
    
    if (entry.type === 'PLANNER_RESPONSE' && entry.tool_calls) {
        for (const call of entry.tool_calls) {
            if (call.name === 'replace_file_content') {
                const args = typeof call.args === 'string' ? JSON.parse(call.args) : call.args;
                const file = args.TargetFile;
                let target = args.TargetContent.replace(/\r\n/g, '\n');
                let replacement = args.ReplacementContent.replace(/\r\n/g, '\n');
                
                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
                    if (content.includes(target)) {
                        content = content.replace(target, replacement);
                        fs.writeFileSync(file, content, 'utf8');
                        successCount++;
                    } else {
                        console.error('FAILED TO MATCH (replace):', file);
                        failCount++;
                    }
                }
            } else if (call.name === 'multi_replace_file_content') {
                const args = typeof call.args === 'string' ? JSON.parse(call.args) : call.args;
                const file = args.TargetFile;
                const chunks = typeof args.ReplacementChunks === 'string' ? JSON.parse(args.ReplacementChunks) : args.ReplacementChunks;
                
                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
                    let allMatched = true;
                    for (const chunk of chunks) {
                        let target = chunk.TargetContent.replace(/\r\n/g, '\n');
                        let replacement = chunk.ReplacementContent.replace(/\r\n/g, '\n');
                        if (content.includes(target)) {
                            content = content.replace(target, replacement);
                        } else {
                            allMatched = false;
                        }
                    }
                    if (allMatched) {
                        fs.writeFileSync(file, content, 'utf8');
                        successCount++;
                    } else {
                        console.error('FAILED TO MATCH (multi):', file);
                        failCount++;
                    }
                }
            }
        }
    }
}
console.log('Total successes:', successCount, 'Total failures:', failCount);
