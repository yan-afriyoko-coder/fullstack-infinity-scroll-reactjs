import prisma from "../utils/client.js";

export const getPersonals = async (req, res) => {
  const last_id = parseInt(req.query.lastId) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  let result = [];
  if (last_id < 1) {
    result = await prisma.personaldata.findMany({
      where: {
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            gender: {
              contains: search,
            },
          },
          {
            ip_address: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
  } else {
    result = await prisma.personaldata.findMany({
      where: {
        id: {
          lt: last_id,
        },
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            gender: {
              contains: search,
            },
          },
          {
            ip_address: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
  }
  res.json({
    result,
    lastId: result.length > 0 ? result[result.length - 1].id : 0,
    hasMore: result.length >= limit ? true : false,
  });
};
