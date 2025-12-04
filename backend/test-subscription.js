const axios = require('axios');

const GRAPHQL_URL = 'http://localhost:3200/graphql';

async function run() {
  console.log("Waiting 10 seconds before starting bot actions...");
  await new Promise(resolve => setTimeout(resolve, 10000));
  try {
    // 1. Signup/Login Bot User
    const signupMutation = `
      mutation {
        signup(authInput: { username: "botuser", password: "botpassword" }) {
          accessToken
        }
      }
    `;

    let token;
    try {
      const res = await axios.post(GRAPHQL_URL, { query: signupMutation });
      if (res.data.errors) {
        // Maybe already exists, try login
        const loginMutation = `
          mutation {
            login(authInput: { username: "botuser", password: "botpassword" }) {
              accessToken
            }
          }
        `;
        const loginRes = await axios.post(GRAPHQL_URL, { query: loginMutation });
        token = loginRes.data.data.login.accessToken;
      } else {
        token = res.data.data.signup.accessToken;
      }
    } catch (e) {
      console.error("Auth failed", e.response?.data || e.message);
      return;
    }

    console.log("Bot logged in, creating post...");

    // 2. Create Post
    const createPostMutation = `
      mutation {
        createBlog(content: "Hello from the Bot! Real-time test.") {
          id
        }
      }
    `;

    await axios.post(
      GRAPHQL_URL,
      { query: createPostMutation },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Bot post created!");

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

run();
