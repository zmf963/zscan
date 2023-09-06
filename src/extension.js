// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zscan" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand("zscan.ping", function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage("pong!");
	});

	let disposable2 = vscode.commands.registerCommand("zscan.scan", function () {
		vscode.window.showInformationMessage("scan:");
		vscode.commands.executeCommand("zscan.ping");
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);

	let currentPanel;

	context.subscriptions.push(
		vscode.commands.registerCommand("zscan.index", () => {
			const columnToShowIn = vscode.window.activeTextEditor
				? vscode.window.activeTextEditor.viewColumn
				: undefined;
			if (currentPanel) {
				currentPanel.reveal(columnToShowIn);
			} else {
				currentPanel = vscode.window.createWebviewPanel(
					"zscanIndex",
					"Zscan Index",
					columnToShowIn || vscode.ViewColumn.One,
					{}
				);
			}
			currentPanel.webview.html = getWebviewIndexContent();

			currentPanel.onDidDispose(
				() => {
					currentPanel = undefined;
				},
				null,
				context.subscriptions
			);
		})
	);
}

// This method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage("zscan quit!");
}

module.exports = {
	activate,
	deactivate,
};

function getWebviewIndexContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Zscan Index</title>
  </head>
  <body>
	  <h2>Zscan Index</h2>
  </body>
  </html>`;
}