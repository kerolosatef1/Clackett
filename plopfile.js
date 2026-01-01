export default function (plop) {
  plop.setGenerator("component", {
    description: "Create Next.js component (client / server / ssg / ssr)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
      {
        type: "list",
        name: "type",
        message: "Component type:",
        choices: [
          { name: "Client Component", value: "client" },
          { name: "Server Component", value: "server" },
          { name: "SSG (Static)", value: "ssg" },
          { name: "SSR (Dynamic)", value: "ssr" },
        ],
      },
    ],
    actions: (data) => {
      const basePath = "app/components/{{pascalCase name}}";

      let templateFile = "";

      switch (data.type) {
        case "client":
          templateFile = "plop-templates/component/client.hbs";
          break;
        case "server":
          templateFile = "plop-templates/component/server.hbs";
          break;
        case "ssg":
          templateFile = "plop-templates/component/ssg.hbs";
          break;
        case "ssr":
          templateFile = "plop-templates/component/ssr.hbs";
          break;
      }

      return [
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile,
        },
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.module.css`,
          templateFile: "plop-templates/component/style.hbs",
        },
      ];
    },
  });
}
