// noinspection JSUnusedGlobalSymbols
export default {
  Mutation: {
    changeShowType: (_, { show_type }, { cache }) => {
      // noinspection JSUnresolvedFunction
      cache.writeData({ data: { show_type } });
      return { show_type, __typename: 'ShowType' };
    }
  }
};
