module.exports = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "rent-a-vehicle",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
};
