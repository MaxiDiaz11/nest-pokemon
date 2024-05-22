import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response..interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async populateDB() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; nro: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, nro });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'DB populated';
  }
}
