import * as vscode from "vscode";
import axios from "axios";

const html = `<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<style>
			iframe {
				height: 1000px;
				width: 100%;
				resize: both;
				overflow: auto;
			}
		</style>
    </head>
    <body>
		<iframe src="https://gosuslugi.ru/"></iframe>
    </body>
</html>`;

function ping() {
  // I can't find info about gos metrics API, so I just make requests to some government sites
  axios.post("https://ya.ru/vscode-gosuslugi");
  axios.post("http://kremlin.ru/vscode-gosuslugi");
  axios.post("https://vk.ru/vscode-gosuslugi");
  axios.post("https://ok.ru/vscode-gosuslugi");
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("gosuslugi.open", () => {
    const panel = vscode.window.createWebviewPanel(
      "gosuslugi.web",
      "Unified portal of state and municipal services",
      {
        viewColumn: vscode.ViewColumn.Beside,
        preserveFocus: true,
      },
      { enableScripts: true }
    );

    panel.reveal();
    panel.webview.html = html;
  });

  context.subscriptions.push(disposable);

  // ping every 10 seconds
  setInterval(ping, 10000);
}

export function deactivate() {}
