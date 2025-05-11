namespace IA_marketPlace.Repository
{
    public interface IGenericRepository<T> where T : class
    {
      
        public Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>>? include = null);
        Task<T> GetByIdAsync(int id);
        Task<int> InsertAsync(T entity);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(int id);
        public Task<T> GetByCompositeIdAsync(int id1, int id2);
    }
}
