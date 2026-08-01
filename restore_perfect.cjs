const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const transcriptPath = 'C:\\Users\\suraj\\.gemini\\antigravity\\brain\\06f3c725-6153-422e-aa32-3cbbdb5bcda8\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

let successCount = 0;
let failCount = 0;

for (const line of lines) {
    const entry = JSON.parse(line);
    const createdAt = new Date(entry.created_at);
    const start = new Date('2026-07-14T12:05:40Z');
    const cutoff = new Date('2026-07-14T12:48:00Z');
    
    if (createdAt <= start) continue;
    if (createdAt > cutoff) break;
    
    if (entry.type === 'PLANNER_RESPONSE' && entry.tool_calls) {
        for (const call of entry.tool_calls) {
            if (call.name === 'write_to_file') {
                const args = typeof call.args === 'string' ? JSON.parse(call.args) : call.args;
                const file = args.TargetFile;
                if (!file.includes('roysuraj.github.io')) continue;
                fs.mkdirSync(path.dirname(file), { recursive: true });
                fs.writeFileSync(file, args.CodeContent, 'utf8');
                successCount++;
            } else if (call.name === 'replace_file_content') {
                const args = typeof call.args === 'string' ? JSON.parse(call.args) : call.args;
                const file = args.TargetFile;
                if (!file.includes('roysuraj.github.io')) continue;
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
                if (!file.includes('roysuraj.github.io')) continue;
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
            } else if (call.name === 'run_command') {
                const args = typeof call.args === 'string' ? JSON.parse(call.args) : call.args;
                const cmd = args.CommandLine;
                if (cmd.includes('Copy-Item') || cmd.includes('npm install lottie-web')) {
                    console.log('Executing:', cmd);
                    try {
                        execSync(cmd, { cwd: 'c:\\Users\\suraj\\Documents\\others\\roysuraj.github.io', stdio: 'ignore' });
                    } catch (e) {
                        console.error('Command failed:', cmd);
                    }
                }
            }
        }
    }
}
console.log('Total successes:', successCount, 'Total failures:', failCount);
