export interface Planet {
	readonly name: string,
	readonly rotation_period: string,
	readonly orbital_period: string,
	readonly diameter: string,
	readonly climate: string,
	readonly gravity: string,
	readonly terrain: string,
	readonly surface_water: string,
	readonly population: string,
	readonly residents: string[],
	readonly films: string[],
	readonly created: string
	readonly edited: string
	readonly url: string
}

export interface PlanetsResponse {
  readonly count: number
  next: string | null
  previous: string | null
  readonly results: Planet[]
}
