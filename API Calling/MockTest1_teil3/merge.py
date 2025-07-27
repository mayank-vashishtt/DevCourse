from pydub import AudioSegment
from gtts import gTTS
import os

# List your audio files in order
audio_files = [f"dialogue_{i}.mp3" for i in range(5)]  # 5 files: 0 to 4

final_audio = AudioSegment.silent(duration=500)

for idx, audio_file in enumerate(audio_files):
    # Generate spoken number
    tts = gTTS(text=str(idx), lang='de')
    tts_file = f"number_{idx}.mp3"
    tts.save(tts_file)
    number_audio = AudioSegment.from_mp3(tts_file)
    # Add number and dialogue audio
    final_audio += number_audio + AudioSegment.silent(duration=300)
    final_audio += AudioSegment.from_mp3(audio_file) + AudioSegment.silent(duration=700)
    os.remove(tts_file)  # Clean up

final_audio.export("merged_dialogues.mp3", format="mp3")
print("✅ Merged audio saved as merged_dialogues.mp3")
