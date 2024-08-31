interface RequestBody {
    From: string;
    To: string;
    CallStatus: string;
    Duration: number;
    RecordingUrl: string;
    Digits?: string
};

interface RequestQuery {
    senderNumber: string;
}