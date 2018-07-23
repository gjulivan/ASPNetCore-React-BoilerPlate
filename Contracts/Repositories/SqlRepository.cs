//using Dapper;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;


//namespace Infrastructure.Repositories
//{
//    public abstract class SqlRepository<TEntity> : IRepository<TEntity, int> where TEntity : BaseEntity<int>
//    {
//        private readonly string _tableName;

//        internal IDbConnection Connection
//        {
//            get
//            {
//                return new SqlConnection(@"sdsd");
//            }
//        }

//        public SqlRepository(string tableName)
//        {
//            _tableName = tableName;
//        }

//        internal virtual dynamic Mapping(TEntity item)
//        {
//            return item;
//        }

//        public virtual int Create(TEntity entity)
//        {
//            using (IDbConnection cn = Connection)
//            {
//                var parameters = (object)Mapping(entity);
//                cn.Open();
//                entity.Id = cn.ExecuteScalar<int>("ProcedureName", parameters, null, null, CommandType.StoredProcedure);
//            }

//            return entity.Id;
//        }

//        public virtual void Delete(TEntity entity)
//        {
//            throw new NotImplementedException();
//        }

//        public virtual TEntity Get(int id)
//        {
//            TEntity entity;
//            using (IDbConnection cn = Connection)
//            {
//                var paramerters = (object)new { Id = id };
//                cn.Open();
//                entity = cn.QuerySingle<TEntity>("SELECT * FROM " + _tableName +" where Id = @Id and Deleted IS NULL", param: paramerters);
//            }

//            return entity;
//        }

//        public virtual IEnumerable<TEntity> GetAll()
//        {
//            throw new NotImplementedException();
//        }

//        public virtual void Update(TEntity entity)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}