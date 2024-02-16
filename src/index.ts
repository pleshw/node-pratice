import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

import express, { Express, Request, Response, Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import * as dotenv from 'dotenv';

AppDataSource.initialize()
  .then( () => {

    dotenv.config();

    const app: Application = express();
    const port = process.env.PORT || 8000;
    app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerDocument ) );

    app.get( '/', async ( req: Request, res: Response ) => {
      res.send( `Welcome to Express & TypeScript Server ${ ( await User.findOneBy( { id: 1 } ) ).firstName }` );
    } );

    app.listen( port, () => {
      console.log( `Server is Fire at http://localhost:${ port }` );
    } );
  } )
  .catch( ( error ) => console.log( error ) )

