namespace Infrastructure.Repositories
{
    using Dapper;
    using Domain;
    using System.Collections.Generic;
    using System.Data;
    using Microsoft.Extensions.Configuration;
    using System.Data.SqlClient;

    public abstract class SqlRepository<TEntity> : IRepository<TEntity, int> where TEntity : BaseEntity<int>
    {
        private readonly string _tableName;
        public abstract IConfiguration Config { get; set; }

        internal IDbConnection Connection
        {
            get
            {
                return new SqlConnection(Config.GetConnectionString(@"HokkoDb"));
            }
        }

        public SqlRepository(string tableName)
        {
            _tableName = tableName;
        }
        
        public virtual TEntity Get(int id)
        {
            TEntity entity;
            using (IDbConnection cn = Connection)
            {
                var paramerters = (object)new { Id = id };
                cn.Open();
                entity = cn.QuerySingle<TEntity>(@"SELECT * FROM " + _tableName + " where Id = @Id and Deleted IS NULL", param: paramerters);
                cn.Close();
            }

            return entity;
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            IEnumerable<TEntity> collection;
            using (IDbConnection cn = Connection)
            {
                cn.Open();
                collection = cn.Query<TEntity>(@"SELECT * FROM " + _tableName + " WHERE Deleted IS NULL");
                cn.Close();
            }

            return collection;
        }

        public abstract void Update(TEntity entity);
        public abstract int Create(TEntity entity);

        public void Delete(int Id)
        {
            using (IDbConnection cn = Connection)
            {
                var parameters = (object)new { Id = Id };
                cn.Open();
                cn.Execute(@"DELETE FROM " + _tableName + " WHERE Id = @Id", param: parameters);
                cn.Close();
            }
        }
    }
}