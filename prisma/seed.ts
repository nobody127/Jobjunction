import prisma from "../db/index";

async function insertUser() {
  try {
    await prisma.user.upsert({
      where: {
        id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
      },

      update: {
        id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
      },
      create: {
        id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
        username: "admin_user",
        bio: "Admin of the platform",
        password:
          "$2b$10$cdQ5cyA33oaClqeqMHmU/OEKwJ4FadNeE6UpFfFE5hbOOdv2lHgxy",
        avatar:
          "https://t4.ftcdn.net/jpg/00/88/53/89/360_F_88538986_5Bi4eJ667pocsO3BIlbN4fHKz8yUFSuA.jpg",
        email: "admin@example.com",
        instagram_url: "",
        linkedin_url: "",
        twitter_url: "",
        provider: "google",
        provider_id: "admin-google-id",
        role: "ADMIN",
      },
    });

    await prisma.user.upsert({
      where: {
        id: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
      },

      update: {
        id: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
      },
      create: {
        id: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
        username: "user",
        bio: "User of the platform",
        password:
          "$2b$10$1WvSCj1oew3dRXen0nox5OqIReChI/fXxRL93pHvuzNp6Be.3I0YS",
        avatar:
          "https://www.shutterstock.com/image-photo/portrait-smiling-man-curly-black-260nw-2141624517.jpg",
        email: "user@example.com",
        instagram_url: "https://instagram.com/user",
        linkedin_url: "https://linkedin.com/in/user",
        twitter_url: "https://twitter.com/user",
        provider: "credentials",
        provider_id: null,
        role: "USER",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function insertPosts() {
  try {
    await prisma.post.upsert({
      where: {
        id: "c81bc81b-dead-4e5d-abff-90865d1e13b3",
      },
      update: {
        id: "c81bc81b-dead-4e5d-abff-90865d1e13b3",
      },
      create: {
        id: "c81bc81b-dead-4e5d-abff-90865d1e13b3",
        authorId: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
        apply_link: "https://google.com",
        company: "Microsoft Inc",
        experience_level: "1y",
        job_type: "Internship",
        location: "Onsite",
        position: "Frontend",
        role_description: "Hello world of the world is one of ",
        role_name: "Frontend",
        salary_max: 5000,
        salary_min: 150000,
      },
    });

    await prisma.post.upsert({
      where: {
        id: "d81bc81b-dead-4e5d-abff-90865d1e13b4",
      },
      update: {
        id: "d81bc81b-dead-4e5d-abff-90865d1e13b4",
      },
      create: {
        id: "d81bc81b-dead-4e5d-abff-90865d1e13b4",
        authorId: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
        apply_link: "https://google.com",
        company: "Amazon Inc",
        experience_level: "Fresher",
        job_type: "Fulltime",
        location: "Remote",
        position: "Go",
        role_description: "Hello world of the world is one of ",
        role_name: "Go",
        salary_max: 50000,
        salary_min: 1500000,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    await insertUser();
    await insertPosts();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => {
    console.log("Successfully seeded");
  })
  .catch((err) => console.log(err))
  .finally(() => {
    prisma.$disconnect();
  });
