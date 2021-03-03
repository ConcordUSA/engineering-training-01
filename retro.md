# Retrospective
This is meant to document learnings about the entire Engineering Training program, as well as this product to better prepare the next iteration of this program.

## Authentication
Make sure the authentication is setup before starting. Especially how the testing suite will interact with it. We burned a lot of time when we realized that our testing plan didn't work when our test runners couldn't support creating users / loggin in with users locally on the Firebase emulators. This meant that we had difficulty testing in isolation.

## Code organization
I would not use a mono repo approach. If this system stays as simple as it is, I would hold the server and client in the same repo, but not run via lerna. I realized that one main reason I used lerna was for the release management. If I did it over I would research a way to use conventional commits for the automated release cycle, but not rely on lerna.

## API
While firebase is awesome and makes it easy to do all the calls from the client, I would ensure that we can run a REST API to make all the database calls.