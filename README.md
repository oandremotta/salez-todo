
# Angular and Ionic Project

This project is built with Angular 18.1.2, Ionic 7.2.0, Node.js 20.11.0, and npm 10.2.4. It uses Tailwind CSS for styling.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js 20.11.0](https://nodejs.org/en/)
- [npm 10.2.4](https://www.npmjs.com/)
- [Ionic CLI](https://ionicframework.com/docs/cli)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/oandremotta/salez-todo.git
   cd salez-todo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Development

To start the development server, run:

```bash
ionic server --ssl
```

This will start the application at `https://localhost:8100/tabs/tasks`. The app will automatically reload if you change any of the source files.

## Build

To build the project, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Usage

After building the project, you can deploy the contents of the `dist/` directory to your web server.

## Dependencies

- **Angular**: 18.1.2
- **Ionic**: 7.2.0
- **Node.js**: 20.11.0
- **npm**: 10.2.4
- **Tailwind CSS**: Latest version

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
