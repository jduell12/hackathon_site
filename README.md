# Pendo Test Site

## Used for integration testing in all environments.

This is a test site similar to our [Pendo QE site](https://pendo-io.github.io/setup.html) but allows a user to be able to inject a native integration into the test site.

This helps to allow more than just members of Tapioca to triage integration bugs that come in faster without the need to reach out to Team Tapioca regarding how to test an integration for a customer.

To use the site successfully you'll need to fill out the form with appropiate information:

1. GCS Bucket (hint: cdn.pendo.io): This is where you enter the GCS bucket for your server. This is found in the install snippet in the subscription. Examples:

- Pendo-Dev: pendo-dev-static.storage.googleapis.com
- Pendo-Widlings: pendo-wildlings-static.storage.googleapis.com
- Pendo-Test: pendo-test-static.storage.googleapis.com
- Production: cdn.pendo.io

2. apiKey: This is the apiKey for your subscription. Also found in the Pendo snippet on your subscription.
3. Visitor Id: Some visitor id. It just needs a value so it can tie events to a visitor.
4. Role (Optional): Drown down with possible roles to choose for the visitor.
5. Account ID (optional): Additional metadata. Not required.
6. Account Name (optional): An account name. If the sub has parent accounts, it needs to be in the `parent::account` format.

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploy

https://learnvue.co/articles/deploy-vue-to-github-pages
