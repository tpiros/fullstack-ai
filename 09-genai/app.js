import { v2 as cloudinary, config } from 'cloudinary';
config({ secure: true });
// const result = await cloudinary.uploader.upload('hiking_dog_mountain.jpeg', {
//   detection: 'captioning',
// });
// console.log(result.info.detection.captioning.data.caption);

// const result = cloudinary.url('hiking_dog_mountain', {
//   effect: 'gen_remove:prompt_person and dog;multiple_true',
// });

// const result = cloudinary.url('hiker', {
//   aspect_ratio: '16:9',
//   background: 'gen_fill',
//   width: 3400,
//   crop: 'pad',
// });

// const result = cloudinary.url('dog', {
//   effect: 'gen_replace:from_dog;to_cat',
// });

// const result = cloudinary.url('jamstack-training/business-man-3', {
//   effect: 'gen_recolor:prompt_tie;to-color_brown',
// });

// console.log(result);
