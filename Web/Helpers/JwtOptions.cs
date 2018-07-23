using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Helpers
{
    public static class JwtOptions
    {
        public const string ISSUER = "hokko-server"; // издатель токена
        public const string AUDIENCE = "domain.name"; // потребитель токена
        public const int LIFETIME = 10; // время жизни токена - 10 минут
        public const int REMEMBERMETIME = 60; // время жизни токена - 60 минут
    }
}
