// Commands checked against published Harness/Mods installers and Forge source docs.
const harness = [
  ['macOS / Linux', 'curl -fsSL https://jlema0590.github.io/aikya-harness/install.sh | sh'],
  ['Windows PowerShell', 'irm https://jlema0590.github.io/aikya-harness/install.ps1.txt | iex'],
];
const mods = [
  ['macOS / Linux', 'curl -fsSL https://raw.githubusercontent.com/jlema0590/aikya-mods/v0.0.10/installers/install.sh | bash -s -- --version v0.0.10 aikya-flow aikya-usage --scope user'],
  ['Windows PowerShell', String.raw`$aikyaInstaller = Join-Path $env:TEMP 'aikya-mods-install.ps1'
Invoke-WebRequest -UseBasicParsing -ErrorAction Stop -Uri 'https://raw.githubusercontent.com/jlema0590/aikya-mods/v0.0.10/installers/install.ps1' -OutFile $aikyaInstaller
& $aikyaInstaller -Version v0.0.10 -Mods aikya-flow,aikya-usage -Scope user`],
];
const forge = [
  ['macOS / Linux', `git clone --branch develop https://github.com/jlema0590/aikya-forge.git
cd aikya-forge
python3 -m venv .venv
. .venv/bin/activate
python -m pip install 'setuptools>=77' wheel build
python -m pip install --no-build-isolation -e ".[terminal]"
npm --prefix packages/aikya-pi ci --ignore-scripts --no-audit --no-fund`],
  ['Windows PowerShell', String.raw`git clone --branch develop https://github.com/jlema0590/aikya-forge.git
cd aikya-forge
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install 'setuptools>=77' wheel build
python -m pip install --no-build-isolation -e ".[terminal]"
npm --prefix packages/aikya-pi ci --ignore-scripts --no-audit --no-fund`],
];
const instructions = {
  harness: {systems:harness, note:'Installs Harness with Flow and Usage for your user. BoxBot is optional. Open a new terminal and Claude session afterward.', next:'/aikya-init', nextLabel:'Then, inside Claude Code', nextNote:'Use /aikya-init for a new project or /aikya-analyze for an existing repository. Choose one.'},
  mods: {systems:mods, note:'These commands install Flow and Usage from the published v0.0.10 release. This installer requires Git and compatible Claude Code. Skip this if Harness already installed these mods.', next:'claude plugin install aikya-boxbot@aikya-mods --scope user', nextLabel:'Optional: add BoxBot', nextNote:'After Flow and Usage installation has registered the marketplace, add BoxBot if you want it. Restart Claude Code after installing mods.'},
  forge: {systems:forge, note:'Native downloads are not published yet. Use this source installation with Python 3.10–3.13, Node.js 22.19.0+ and Git.', next:'aikya terminal --runtime-dir ./packages/aikya-pi --target /absolute/path/to/project', nextLabel:'Launch from the source checkout', nextNote:'Replace the target with your project path. Provider credentials and a positive local execution budget are configured separately in Settings.'},
};
function commandBlock(command, escape) {
  return `<div class="install-command"><pre tabindex="0"><code>${escape(command)}</code></pre><div class="command-actions"><button type="button" data-copy-command hidden>Copy command</button><span role="status" data-copy-feedback></span></div></div>`;
}
export function renderInstallation(product, escape) {
  const data = instructions[product.id];
  return `<section id="install-${product.id}" class="installation" data-install="${product.id}" aria-label="${product.name} installation"><h3>Installation</h3><p>${data.note}</p><div class="install-systems">${data.systems.map(([system, command], index) => `<details name="install-${product.id}" ${index === 0 ? 'open' : ''}><summary>${system}</summary>${commandBlock(command,escape)}</details>`).join('')}</div><div class="install-next"><h4>${data.nextLabel}</h4><p>${data.nextNote}</p>${commandBlock(data.next,escape)}${product.id === 'harness' ? `<h4>For an existing project instead</h4>${commandBlock('/aikya-analyze',escape)}` : ''}</div><a class="text-link" href="${product.installation}">${product.id === 'forge' ? 'Source quick start' : 'Official installation guide'}</a></section>`;
}
