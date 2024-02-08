import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express();

//app.use(cors());
//app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res) => res.send(true));

app.listen(3000);