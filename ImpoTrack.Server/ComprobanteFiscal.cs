namespace ImpoTrack.Server
{
    public class ComprobanteFiscal
    {
        [Key]
        public int ComprobanteId { get; set; }
        public string? RncCedula { get; set; }
        public string? NCF { get; set; }
        public double Monto { get; set; }
        public double Itbis18 { get; set; }
    }
}