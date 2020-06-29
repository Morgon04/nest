export const config = (_: any) => ({
    mongo:{
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD
    }
});