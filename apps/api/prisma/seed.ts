import { faker } from "@faker-js/faker";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    faker.string.uuid()
  );
}

async function main() {
  console.log("Seeding started...");

  // ----------------------
  // USERS
  // ----------------------
  const usersData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  }));

  await prisma.user.createMany({ data: usersData });

  const users = await prisma.user.findMany();

  // ----------------------
  // TAGS
  // ----------------------
  const tagsData = Array.from({ length: 8 }).map(() => ({
    name: faker.word.noun() + "-" + faker.string.uuid().slice(0, 5),
  }));

  await prisma.tag.createMany({ data: tagsData });

  const tags = await prisma.tag.findMany();

  // ----------------------
  // POSTS
  // ----------------------
  for (let i = 0; i < 40; i++) {
    const title = faker.lorem.sentence();

    const post = await prisma.post.create({
      data: {
        title,
        slug: generateSlug(title),
        thumbnail: faker.image.urlLoremFlickr(),
        content: faker.lorem.paragraphs(4),
        published: true,
        authorId: faker.helpers.arrayElement(users).id,
        
        // attach random tags
        tags: {
          connect: faker.helpers
            .arrayElements(tags, faker.number.int({ min: 1, max: 3 }))
            .map((tag) => ({ id: tag.id })),
        },
      },
    });

    // ----------------------
    // COMMENTS
    // ----------------------
    await prisma.comment.createMany({
      data: Array.from({ length: 10 }).map(() => ({
        content: faker.lorem.sentence(),
        postId: post.id,
        authorId: faker.helpers.arrayElement(users).id,
      })),
    });

    // ----------------------
    // LIKES
    // ----------------------
    const randomUsers = faker.helpers.arrayElements(
      users,
      faker.number.int({ min: 1, max: 5 })
    );

    await prisma.like.createMany({
      data: randomUsers.map((user) => ({
        userId: user.id,
        postId: post.id,
      })),
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
