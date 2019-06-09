import dotenv from 'dotenv';

dotenv.config();

const config = {
  awsDDBCfg: {
    region: process.env.AWS_REGION
  }
};

if (process.env.DDB_URL) {
  config.awsDDBCfg.endpoint = process.env.DDB_URL;
}

export default config;
