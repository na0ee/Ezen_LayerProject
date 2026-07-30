const generatedImages = import.meta.glob(
  "../assets/Community/GeneratedProfiles/*.{avif,webp,png,jpg,jpeg}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const imageEntries = Object.entries(generatedImages)
  .map(([path, src]) => ({
    name: path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase(),
    src,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const hashText = (value) =>
  [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );

const shuffleWithSeed = (items, seed) => {
  const next = [...items];
  let state = seed || 1;

  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const targetIndex = state % (index + 1);
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  }

  return next;
};

const publicPosts = imageEntries
  .filter((image) => /^post\d+$/.test(image.name))
  .map((image) => image.src);
const publicProfiles = imageEntries
  .filter((image) => /^profile\d+$/.test(image.name))
  .map((image) => image.src);

const dedicatedIds = [
  ...new Set(
    imageEntries
      .map((image) => image.name.match(/^(\d{2})-/)?.[1])
      .filter(Boolean),
  ),
];

const dedicatedSets = dedicatedIds.map((id) => ({
  id,
  background: imageEntries.find((image) =>
    new RegExp(`^${id}-profile-bg(?:-\\d+)?$`).test(image.name),
  )?.src,
  profile: imageEntries.find((image) =>
    new RegExp(`^${id}-profile(?:-\\d+)?$`).test(image.name),
  )?.src,
  posts: imageEntries
    .filter((image) => new RegExp(`^${id}-post`).test(image.name))
    .map((image) => image.src),
}));

const publicSets = publicProfiles.map((profile, index) => ({
  id: `public-${index + 1}`,
  profile,
  background: publicPosts[(index * 2 + 1) % publicPosts.length],
  posts: publicPosts.filter((_, postIndex) => postIndex % publicProfiles.length === index),
}));

const profileSets = [...dedicatedSets, ...publicSets].filter(
  (profileSet) => profileSet.profile,
);

const fixedProfileSetIndexes = {
  "beige-look-최해수": 0,
  "santal-33-우디수집가": 1,
  "lazy-sunday-morning-솜이불향": 2,
  "sunset-commute-fadedscent": 3,
  "cloudy-seaside-지나가던조향사": 4,
  "rainy-evening-walk-비오는날의향": 5,
  "fruity-lover-과일향러버": 6,
  "office-scent-출근향찾는중": 7,
};

export function getCommunityGeneratedProfile(profileKey) {
  if (profileSets.length === 0) return null;

  const seed = hashText(profileKey);
  const fixedIndex = fixedProfileSetIndexes[profileKey];
  const profileSet =
    profileSets[
      fixedIndex === undefined
        ? seed % profileSets.length
        : fixedIndex % profileSets.length
    ];
  const shuffledPublicPosts = shuffleWithSeed(publicPosts, seed + 41);
  const posts = [...new Set([...profileSet.posts, ...shuffledPublicPosts])];

  return {
    id: profileSet.id,
    profile: profileSet.profile,
    background:
      profileSet.background ??
      posts[0] ??
      profileSet.profile,
    posts,
  };
}
