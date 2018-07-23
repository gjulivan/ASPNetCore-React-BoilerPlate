namespace Infrastructure
{
	using System.Collections.Generic;
	public interface IRepository<TEntity, T> where TEntity : class where T : struct
	{
		IEnumerable<TEntity> GetAll();
		TEntity Get(T id);
		T Create(TEntity entity);
		void Update(TEntity entity);
		void Delete(T Id);
	}
}
