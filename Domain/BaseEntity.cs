using System;

namespace Domain
{
    public class BaseEntity<T> : IEntity where T : struct
    {
        public BaseEntity()
        {
            Created = DateTime.Now;
            Modified = Created;
        }
        public T Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public DateTime? Deleted { get; set; }
    }
}
