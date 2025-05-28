import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

export async function showBanner() {
  return new Promise<void>((resolve, reject) => {
    figlet("PokeCheat CLI", (err, data) => {
      if (err) return reject(err);
      console.log(gradient.pastel.multiline(data || ""));
      console.log(
        chalk.cyan(
          "\nConsulte as fraquezas de cada pokemon\n"
        )
      );
      resolve();
    });
  });
}