import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export async function getTypeEffectiveness(types: string[]): Promise<Record<string, number>> {
  const effectiveness: Record<string, number> = {};

  for (const type of types) {
    const res = await axios.get(`${API}/type/${type}`);
    const data = res.data.damage_relations;

    const map: Record<string, number> = {
      double_damage_from: 2,
      half_damage_from: 0.5,
      no_damage_from: 0,
    };

    for (const key in map) {
      const list = data[key as keyof typeof data] as { name: string }[];
      for (const entry of list) {
        const name = entry.name;
        if (!effectiveness[name]) effectiveness[name] = 1;
        effectiveness[name] *= map[key];
      }
    }
  }

  return effectiveness;
}
