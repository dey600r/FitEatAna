import { Router, Request, Response } from 'express';
// import { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } from 'simple-oauth2';
import ClientOAuth2 from 'client-oauth2';

const fitbitRoutes = Router();

// const config = {
//     client: {
//       id: '22C7D3',
//       secret: 'e106e52bb625f33eebd9fd4adce69107'
//     },
//     auth: {
//       tokenHost: 'https://www.fitbit.com/oauth2/authorize'
//     }
//   };

fitbitRoutes.get('/test', (req: Request, res: Response ) => {
  res.send('HOLA');
});


fitbitRoutes.get('/auth', (req: Request, res: Response ) => {
    // const client = new AuthorizationCode(config);
 
//   const authorizationUri = client.authorizeURL({
//     redirect_uri: 'http://localhost:3000/callback',
//     scope: '<scope>',
//     state: '<state>'
//   });
 
//   // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
//   res.redirect(authorizationUri);
 
//   const tokenParams = {
//     code: '<code>',
//     redirect_uri: 'http://localhost:3000/callback',
//     scope: '<scope>',
//   };
 
//   try {
//     const accessToken = await client.getToken(tokenParams);
//   } catch (error) {
//     console.log('Access Token Error', error.message);
//   }

const fitbitAuth = new ClientOAuth2({
    clientId: '22C7D3',
    clientSecret: 'e106e52bb625f33eebd9fd4adce69107',
    accessTokenUri: 'https://api.fitbit.com/oauth2/token',
    authorizationUri: 'https://www.fitbit.com/oauth2/authorize',
    redirectUri: 'http://localhost:8100',
    scopes: ['activity', 'social'],
    state: 'dey125r'
  });
  const url = fitbitAuth.code.getUri();

  res.redirect(url);
});

fitbitRoutes.get('/auth/callback', function (req, res) {
    const fitbitAuth = new ClientOAuth2({
        clientId: '22C7D3',
        clientSecret: 'e106e52bb625f33eebd9fd4adce69107',
        accessTokenUri: 'https://api.fitbit.com/oauth2/token',
        authorizationUri: 'https://www.fitbit.com/oauth2/authorize',
        redirectUri: 'http://localhost:8100',
        scopes: ['activity', 'social'],
        state: 'dey125r'
      });
      fitbitAuth.code.getToken(req.originalUrl)
      .then(function (user) {
        console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
   
        // Refresh the current users access token.
        user.refresh().then(function (updatedUser) {
          console.log(updatedUser !== user) //=> true
          console.log(updatedUser.accessToken)
        })
   
        // Sign API requests on behalf of the current user.
        user.sign({
          method: 'get',
          url: 'http://example.com'
        })
   
        // We should store the token into a database.
        return res.send(user.accessToken)
      })
  })

export default fitbitRoutes;