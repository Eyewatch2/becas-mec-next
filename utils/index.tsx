interface JSONData {
  children: JSONChild[];
  type?: string;
  url?: string;
  newTab?: boolean;
}

interface JSONChild {
  url: string;
  newTab: boolean;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  type?: string;
}

export function parseJSONToHTML(jsonData: JSONData[]): string {
  let html = "";

  // Recorrer cada objeto del array jsonData
  jsonData.forEach((obj) => {
    if (obj.type === "h4") {
      // Encabezado h4
      html += `<h4 class="text-lg font-bold">${parseChildren(
        obj.children
      )}</h4>`;
    } else {
      // Otros tipos de texto
      html += `<p class="text-sm">${parseChildren(obj.children)}</p>`;
    }
  });

  return html;
}

function parseChildren(children: JSONChild[]): string {
  let result = "";

  children.forEach((child) => {
    let text = child.text || "";

    if (child.bold) {
      text = `<strong>${text}</strong>`;
    }
    if (child.italic) {
      text = `<em>${text}</em>`;
    }
    if (child.underline) {
      text = `<u>${text}</u>`;
    }
    if (child.strikethrough) {
      text = `<del>${text}</del>`;
    }
    if (child.code) {
      text = `<code>${text}</code>`;
    }

    result += text;
  });

  return result;
}
