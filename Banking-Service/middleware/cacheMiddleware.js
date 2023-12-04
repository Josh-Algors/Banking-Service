const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
  
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData)
  {
    return res.json(JSON.parse(cachedData));
  }

  res.sendResponse = res.send;

  res.send = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;