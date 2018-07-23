using SimpleMigrations;
using SimpleMigrations.DatabaseProvider;
using System;
using System.Data.SqlClient;
using System.Reflection;
using System.Linq;

namespace MigrationRunner
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var connectionString = @"Data Source=LT-17-623\SQL17;Initial Catalog=ASPNetCoreTest;Persist security info=True;Integrated Security=SSPI";
            var migrateCommandText = "migrate";
            var rollBackCommandText = "rollback";
            var versionCommand = "-v";
            Console.WriteLine("MigratonRunner commands");
            Console.WriteLine();
            Console.WriteLine("migrate");
            Console.WriteLine("migrate -v <VERSION>");
            Console.WriteLine("rollback");
            Console.WriteLine("rollback -v <VERSION>");
            Console.WriteLine();
            Console.WriteLine("ENTER COMMAND");
            Console.WriteLine();

            using (var connection = new SqlConnection(connectionString))
            {
                var databaseProvider = new MssqlDatabaseProvider(connection);
                var migrator = new SimpleMigrator(Assembly.Load(new AssemblyName("Migrations.Sql")), databaseProvider);
                migrator.Load();

                var newMigrations = migrator.Migrations.Where(x => x.Version > migrator.CurrentMigration.Version);

                if (newMigrations.Any())
                {
                    Console.WriteLine("There are new migrations");
                    Console.ForegroundColor = ConsoleColor.Green;

                    foreach (var migration in newMigrations.OrderBy(x => x.Version))
                    {
                        Console.WriteLine(migration.Version.ToString() + "-" + migration.Description);
                    }

                    Console.ResetColor();
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("There are no new migrations");
                    Console.ResetColor();
                }
            }


            var commandText = Console.ReadLine();

            if (commandText.ToLower().Contains(migrateCommandText))
            {
                if (commandText.ToLower().Contains(versionCommand))
                {
                    
                    string version = commandText.Substring(commandText.IndexOf(versionCommand) + versionCommand.Length + 1);
                    long versionLong;
                    var castedToLong = long.TryParse(version,out versionLong);

                    if (castedToLong)
                    {
                        using (var connection = new SqlConnection(connectionString))
                        {
                            var databaseProvider = new MssqlDatabaseProvider(connection);
                            var migrator = new SimpleMigrator(Assembly.Load(new AssemblyName("Migrations.Sql")), databaseProvider);
                            migrator.Load();
                            migrator.MigrateTo(versionLong);
                        }
                        Console.WriteLine("migrate database to the version " + version + " !");
                        Console.ReadKey();
                    }
                    
                }
                else
                {
                    using (var connection = new SqlConnection(connectionString))
                    {
                        var databaseProvider = new MssqlDatabaseProvider(connection);
                        var migrator = new SimpleMigrator(Assembly.Load(new AssemblyName("Migrations.Sql")), databaseProvider);
                        migrator.Load();
                        migrator.MigrateToLatest();
                    }
                    Console.WriteLine("migrate database to latest version");
                    Console.ReadKey();
                }

            }else if (commandText.ToLower().Contains(rollBackCommandText))
            {
                if (commandText.ToLower().Contains(versionCommand))
                {
                    string version = commandText.Substring(commandText.IndexOf(versionCommand) + versionCommand.Length + 1);
                    long versionLong;
                    var castedToLong = long.TryParse(version, out versionLong);

                    if (castedToLong)
                    {
                        using (var connection = new SqlConnection(connectionString))
                        {
                            var databaseProvider = new MssqlDatabaseProvider(connection);
                            var migrator = new SimpleMigrator(Assembly.Load(new AssemblyName("Migrations.Sql")), databaseProvider);
                            migrator.Load();
                            migrator.MigrateTo(versionLong);
                        }
                        Console.WriteLine("rollback database to the version " + version + " !");
                        Console.ReadKey();
                    }
                }
                else
                {
                    Console.WriteLine("Are you sure? y/n");
                    var rollbackResp = Console.ReadLine();
                    if (rollbackResp.Contains("y"))
                    {
                        using (var connection = new SqlConnection(connectionString))
                        {
                            var databaseProvider = new MssqlDatabaseProvider(connection);
                            var migrator = new SimpleMigrator(Assembly.Load(new AssemblyName("Migrations.Sql")), databaseProvider);
                            migrator.Load();
                            migrator.MigrateTo(0);
                        }
                        Console.WriteLine("rollback database!");
                        Console.ReadKey();
                    }
                    else
                    {
                        Console.WriteLine("rollback canceled!");
                        Console.ReadKey();
                    }
                }
            }
            else
            {
                Console.WriteLine("Command not found, please write migrate or rollback");
                Console.ReadKey();
            }
        }
    }
}
