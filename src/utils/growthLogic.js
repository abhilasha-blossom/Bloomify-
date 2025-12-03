import seedImg from '../assets/plants/seed_stage.svg';
import sproutImg from '../assets/plants/sprout_stage.svg';
import youngImg from '../assets/plants/young_plant_stage.svg';
import budImg from '../assets/plants/bud_stage.svg';
import bloomImg from '../assets/plants/bloom_stage.svg';

export const getPlantStage = (streak) => {
    if (streak >= 15) return { stage: 'Bloom', image: bloomImg };
    if (streak >= 10) return { stage: 'Bud', image: budImg };
    if (streak >= 6) return { stage: 'Young', image: youngImg };
    if (streak >= 3) return { stage: 'Sprout', image: sproutImg };
    return { stage: 'Seed', image: seedImg };
};
