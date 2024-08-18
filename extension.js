const vscode = require('vscode');
const prettier = require('prettier');

function activate(context) {
    let disposable = vscode.commands.registerCommand('co.beautifyCode', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const options = { parser: 'typescript' }; // Adjust based on file type
            const formatted = prettier.format(document.getText(), options);

            editor.edit(editBuilder => {
                const entireRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                editBuilder.replace(entireRange, formatted);
            });
        }
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;
