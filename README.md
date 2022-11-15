## Why Next?

The idea was to display a list with the consulted IPs and view the statistics there, unfortunately I didn't have time to complete it.
Next is ideal for this purpose because it allows you to create a rest-api and react client quickly.

Here the API => https://github.com/davila23/cook-unity/tree/main/src/pages/api

Stack: Tailwind CSS + TypeScript + Next.js Starter

Things that were missing to implement:
- Some request validator (express-validator / ajv)
- Test for basic scenarios
- Page with list of queries and statistics
- Upload the code to AWS, possibly I would have done it in AWS Amplify


## Regarding application's traffic

1- Cloud solution:
Place a queue in front of the api with a load-balancer and grow horizontally when there is more traffic

<img width="583" alt="Captura de Pantalla 2022-11-15 a la(s) 03 40 43" src="https://user-images.githubusercontent.com/50145471/201846680-1b53c389-f720-49d2-b255-699ffbe65fe5.png">

2 - Code solution:

    - Enqueue the requests and execute them with a promise.all
    
    - Use multithreading (spawn)

## Usage

### 1. Install Dependencies

```bash
yarn install 
```

### 2. Run Development Environment

```bash
yarn dev 
```

### Demo 

![](https://user-images.githubusercontent.com/50145471/201843274-8c3fde97-1f30-4159-983f-3f2e9b8211fe.gif)
