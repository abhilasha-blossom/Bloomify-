import seedImg from '../assets/plants/seed_stage.svg';
import sproutImg from '../assets/plants/sprout_stage.svg';
import youngImg from '../assets/plants/young_plant_stage.svg';
import budImg from '../assets/plants/bud_stage.svg';
import bloomImg from '../assets/plants/bloom_stage.svg';

// Sunflower
import sunSeed from '../assets/plants/sunflower_seed.svg';
import sunSprout from '../assets/plants/sunflower_sprout.svg';
import sunYoung from '../assets/plants/sunflower_young.svg';
import sunBud from '../assets/plants/sunflower_bud.svg';
import sunBloom from '../assets/plants/sunflower_bloom.svg';

// Succulent
import succSeed from '../assets/plants/succulent_seed.svg';
import succSprout from '../assets/plants/succulent_sprout.svg';
import succYoung from '../assets/plants/succulent_young.svg';
import succBud from '../assets/plants/succulent_bud.svg';
import succBloom from '../assets/plants/succulent_bloom.svg';

// Cherry
import cherrySeed from '../assets/plants/cherry_seed.svg';
import cherrySprout from '../assets/plants/cherry_sprout.svg';
import cherryYoung from '../assets/plants/cherry_young.svg';
import cherryBud from '../assets/plants/cherry_bud.svg';
import cherryBloom from '../assets/plants/cherry_bloom.svg';

const plantAssets = {
    classic: [seedImg, sproutImg, youngImg, budImg, bloomImg],
    sunflower: [sunSeed, sunSprout, sunYoung, sunBud, sunBloom],
    succulent: [succSeed, succSprout, succYoung, succBud, succBloom],
    cherry: [cherrySeed, cherrySprout, cherryYoung, cherryBud, cherryBloom],
};

export const getPlantStage = (streak, type = 'classic') => {
    const assets = plantAssets[type] || plantAssets.classic;

    let index = 0;
    if (streak >= 15) index = 4;
    else if (streak >= 10) index = 3;
    else if (streak >= 6) index = 2;
    else if (streak >= 3) index = 1;
    else index = 0;

    const stages = ['Seed', 'Sprout', 'Young', 'Bud', 'Bloom'];

    return {
        stage: stages[index],
        image: assets[index]
    };
};
