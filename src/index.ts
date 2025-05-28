import chalk from "chalk";
import { getTypeEffectiveness } from "./utils/type-effectiveness";
import { showBanner } from "./utils/showBanner";
import { promptInput } from "./utils/promptInput";
import { resolveTypes } from "./utils/resolveTypes";

async function main() {

  await showBanner();
  while (true) {
    const input = await promptInput();

    try {
      const types = await resolveTypes(input);
      const effectiveness = await getTypeEffectiveness(types);

      const strong: string[] = [];
      const weak: string[] = [];
      const immune: string[] = [];

      for (const [type, multiplier] of Object.entries(effectiveness)) {
        if (multiplier === 2) strong.push(`${type} (200%)`);
        else if (multiplier === 0.5) weak.push(`${type} (50%)`);
        else if (multiplier === 0) immune.push(`${type} (0%)`);
      }

      console.log(chalk.red("\n✖ Fraco contra:"));
      strong.forEach((t) => console.log(chalk.redBright(` - ${t}`)));

      console.log(chalk.green("\n✔ Resiste a:"));
      weak.forEach((t) => console.log(chalk.greenBright(` - ${t}`)));

      console.log(chalk.blue("\n✦ Imune a:"));
      immune.forEach((t) => console.log(chalk.cyanBright(` - ${t}`)));
    } catch (err) {
      console.error(chalk.red(`\nErro: ${(err as Error).message}`));
    }
  }
}

main();
