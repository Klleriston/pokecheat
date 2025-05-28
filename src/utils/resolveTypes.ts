import axios from "axios";
import chalk from "chalk";

const API = "https://pokeapi.co/api/v2";

export async function resolveTypes(input: string): Promise<string[]> {
  try {
    const res = await axios.get(`${API}/pokemon/${input.toLowerCase()}`);
    const types = res.data.types.map((t: { type: { name: string } }) => t.type.name);
    console.log(chalk.yellow(`\nTipo(s) de ${input}: ${types.join(", ")}`));
    return types;
  } catch {
    try {
      const res = await axios.get(`${API}/type/${input.toLowerCase()}`);
      const type = res.data.name;
      console.log(chalk.yellow(`\nTipo: ${type}`));
      return [type];
    } catch {
      throw new Error("pokémon ou tipo n existe");
    }
  }
}