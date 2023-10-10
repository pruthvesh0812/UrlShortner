declare global{
    namespace NodeJS{
        interface ProcessEnv{
            SECRET: string;
            DATABASE_LINK:string;
        }
}
}

export{}
// this file is created because
//You'll need to configure TypeScript to recognize the .env file and its environment variables
//This declaration file informs TypeScript about the types of your environment variables.