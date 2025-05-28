import inquirer from "inquirer";

export async function promptInput(): Promise<string> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "input",
      message: "Digite o nome do Pokémon ou tipo (ex: pikachu ou fire):",
      validate: (value: string) =>
        value.trim().length > 0 || "Entrada obrigatória.",
    },
  ]);
  return answers.input;
}