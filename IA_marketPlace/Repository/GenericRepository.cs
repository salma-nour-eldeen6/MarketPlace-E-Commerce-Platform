using IA_marketPlace.Data;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly MarketplaceContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(MarketplaceContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>>? include = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (include != null)
            {
                query = include(query);
            }
            return await query.ToListAsync();
        }



        public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public async Task<int> InsertAsync(T entity)
        {
            _dbSet.Add(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                return await _context.SaveChangesAsync();
            }
            return 0;
        }
        public async Task<T> GetByCompositeIdAsync(int id1, int id2) => await _context.Set<T>().FindAsync(id1, id2);
    }
}