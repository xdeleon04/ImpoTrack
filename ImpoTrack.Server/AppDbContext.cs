namespace ImpoTrack.Server
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Contribuyente> Contribuyentes => Set<Contribuyente>();
        public DbSet<ComprobanteFiscal> ComprobantesFiscales => Set<ComprobanteFiscal>();
    }
}
