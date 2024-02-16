import { AppDataSource } from "./database/data-source"
import { User } from "./database/entities/User"
import express from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { Request, Response } from "express"

// create and setup express app
const app = express()
const port = process.env.PORT || 8000;
app.use( express.json() )


AppDataSource.initialize()
    .then( () => {
        console.log( "Data Source has been initialized!" );
    } )
    .catch( ( err ) => {
        console.error( "Error during Data Source initialization:", err );
    } );

app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerDocument ) );

app.get( "/users", async function ( req: Request, res: Response ) {
    const users = await AppDataSource.getRepository( User ).find();
    res.json( users );
} )

app.get( "/users/:id", async function ( req: Request, res: Response ) {
    const results = await AppDataSource.getRepository( User ).findOneBy( {
        id: +req.params.id,
    } );

    return res.send( results );
} )

app.post( "/users", async function ( req: Request, res: Response ) {
    const user = AppDataSource.getRepository( User ).create( req.body );
    const results = await AppDataSource.getRepository( User ).save( user );
    return res.send( results );
} )

app.put( "/users/:id", async function ( req: Request, res: Response ) {
    const user = await AppDataSource.getRepository( User ).findOneBy( {
        id: +req.params.id,
    } );

    AppDataSource.getRepository( User ).merge( user, req.body );
    const results = await AppDataSource.getRepository( User ).save( user );
    return res.send( results );
} )

app.delete( "/users/:id", async function ( req: Request, res: Response ) {
    const results = await AppDataSource.getRepository( User ).delete( +req.params.id );
    return res.send( results );
} )

app.listen( port, () => {
    console.log( `Server is Fire at http://localhost:${ port }` );
} );

