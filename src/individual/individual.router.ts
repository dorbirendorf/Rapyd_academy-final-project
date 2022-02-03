
  import express, { Response, Request} from "express";
  import raw from "../middleware/route.async.wrapper.js";
 // import * as artist_service from "./individual.services.js";
  const router = express.Router();
  
  // parse json req.body on post routes
  router.use(express.json());
  
  // // CREATES A NEW ARTIST
  // router.post("/",raw( async (req:Request, res:Response) => {
  //   const artist = await artist_service.createArtist(req.body);
  //   res.status(200).json(artist);
  // }) );

  
  
  // GET ALL Artists
  router.get("/",raw(async (req:Request, res:Response) => {
    console.log("working");
    res.status(200).json("artist");
    })  
  );
  
  // router.get("/updateStatus/:status/:id", raw( async (req, res) => { // update_status
  //   const status = await artist_service.updateStatus_artist(req.params.id,req.params.status);
  //   res.status(200).json(status);
  // }));
  
  // // GETS A SINGLE artist
  // router.get("/:id",raw(async (req:Request, res:Response) => {
  //     const artist = await artist_service.getArtistByid(req.params.id);
  //     if (!artist) return res.status(404).json({ status: "No user found." });
  //     res.status(200).json(artist);
  //   })
  // );
  // ////CHECK
  // // router.get("/pagination/:page/:count",raw(async (req:Request, res:Response) => {
  // //   const artist = await user_model.find().skip(Number(req.params.page)*Number(req.params.count)).limit(Number(req.params.count));                
  // //   res.status(200).json(artist);
  // // })
  // // );
  // // UPDATES A SINGLE USER
  // // router.post("/:id",raw(async (req:Request, res:Response) => {
  // //     const artist = await artist_service.updateArtist(req.params.id,req.body);
  // //     res.status(200).json(artist);
  // //   })
  // // );
  

  // // DELETES A USER
  // router.delete("/:id",verifyAuth, verifyAuto("MODERATOR,ADMIN"),raw(async (req:Request, res:Response) => {
  //     const artist = await artist_service.deleteArtist(req.params.id);
  //    if (!artist) return res.status(404).json({ status: "No user found." });
  //     res.status(200).json(artist);
  //   })
  // ); 
  
  export default router;
  