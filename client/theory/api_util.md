🔧 apiSlice.util methods

Method Description
updateQueryData(endpointName, args, updateFn) Updates the cached result of a query manually. Great for optimistic updates.
invalidateTags(tags) Manually invalidate tags to force refetching of queries associated with those tags.
prefetch(endpointName, args, options) Prefetches data for a query and adds it to the cache (doesn’t trigger loading states).
resetApiState() Completely resets the API slice's cache and subscriptions.
patchQueryData(endpointName, args, patches) Apply immer patches to query data. Great for rolling back optimistic updates.
getRunningOperationPromises() Returns an array of running operation Promises (queries or mutations). Used for server-side rendering (SSR).
🧪 Real-world usage examples

1. ✅ Manually update cached data
   ts
   Copy code
   dispatch(
   apiSlice.util.updateQueryData("getUserProfile", {}, (draft) => {
   draft.firstName = "UpdatedName";
   })
   );
2. 🔁 Force a query to refetch
   ts
   Copy code
   dispatch(apiSlice.util.invalidateTags([TagsAPI.USER]));
3. 🔮 Prefetch data (e.g., on hover)
   ts
   Copy code
   dispatch(apiSlice.util.prefetch("getUserProfile", {}, { force: true }));
4. 🔄 Rollback optimistic update
   ts
   Copy code
   const patchResult = dispatch(
   apiSlice.util.updateQueryData("getUserProfile", {}, (draft) => {
   draft.name = "Optimistic!";
   })
   );

// Later
patchResult.undo(); 5. 🧹 Reset all cache state
ts
Copy code
dispatch(apiSlice.util.resetApiState());
🔥 Pro tip for onQueryStarted
You can use dispatch(apiSlice.util.XXX) right in onQueryStarted to manipulate cache right after a successful mutation:

ts
Copy code
async onQueryStarted(\_, { dispatch, queryFulfilled }) {
const { data } = await queryFulfilled;

dispatch(
apiSlice.util.invalidateTags([TagsAPI.USER])
);
}
