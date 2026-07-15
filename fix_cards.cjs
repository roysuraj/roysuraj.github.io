const fs = require('fs');
const path = require('path');

const files = {
    details: 'c:\\Users\\suraj\\Documents\\others\\roysuraj.github.io\\src\\features\\home\\components\\BoxDetails.vue',
    desc: 'c:\\Users\\suraj\\Documents\\others\\roysuraj.github.io\\src\\features\\home\\components\\BoxDescription.vue',
    services: 'c:\\Users\\suraj\\Documents\\others\\roysuraj.github.io\\src\\features\\home\\components\\BoxServices.vue'
};

// BoxDetails
let details = fs.readFileSync(files.details, 'utf8');
details = details.replace(/const point = new Vector3\([^\)]+\);/, 'const point = new Vector3(5.5, -3.2, 6.75);');
details = details.replace('<div class="box-details-content">', '<img class="box-avatar" src="/images/code3.jpg" alt="Avatar" />\n      <div class="box-details-content">');
if (!details.includes('.box-avatar')) {
    details += `\n<style scoped lang="scss">\n.box-avatar {\n  position: absolute;\n  right: -36px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 2px solid var(--color-cyan-400);\n  object-fit: cover;\n  z-index: 10;\n  box-shadow: 0 0 10px rgba(126,230,215,0.4);\n}\n</style>\n`;
}
fs.writeFileSync(files.details, details);

// BoxDescription
let desc = fs.readFileSync(files.desc, 'utf8');
desc = desc.replace(/const point = new Vector3\([^\)]+\);/, 'const point = new Vector3(5.5, -7.5, 6.75);');
desc = desc.replace('<div class="box-description-content">', '<img class="box-avatar" src="/images/code3.jpg" alt="Avatar" />\n      <div class="box-description-content">');
if (!desc.includes('.box-avatar')) {
    desc += `\n<style scoped lang="scss">\n.box-avatar {\n  position: absolute;\n  right: -36px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 2px solid var(--color-cyan-400);\n  object-fit: cover;\n  z-index: 10;\n  box-shadow: 0 0 10px rgba(126,230,215,0.4);\n}\n</style>\n`;
}
fs.writeFileSync(files.desc, desc);

// BoxServices
let serv = fs.readFileSync(files.services, 'utf8');
serv = serv.replace(/const point = new Vector3\([^\)]+\);/, 'const point = new Vector3(-6.5, -6.0, 6.75);');
serv = serv.replace('<div class="box-services-content">', '<img class="box-avatar" src="/images/code3.jpg" alt="Avatar" />\n      <div class="box-services-content">');
if (!serv.includes('.box-avatar')) {
    serv += `\n<style scoped lang="scss">\n.box-avatar {\n  position: absolute;\n  left: -36px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 2px solid var(--color-cyan-400);\n  object-fit: cover;\n  z-index: 10;\n  box-shadow: 0 0 10px rgba(126,230,215,0.4);\n}\n</style>\n`;
}
fs.writeFileSync(files.services, serv);

console.log('Fixed cards!');
