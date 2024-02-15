 export const requireSignedin = (req: any, res: any, next: any) => {
    req?.user ? next() : res.status(401).send('Unauthorized')
  }