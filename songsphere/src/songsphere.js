import React, { Component } from 'react';
import './songsphere.css';
import zeldaTheme from './princessZelda.mp3'; // Import the audio file
import gerudoValley from './gerudoValley.mp3';
import greatFairy from './greatFairy.mp3';
import albumCover from './zeldaAlbumCover.jpg'; // Import the album cover image

class Songsphere extends Component {
  constructor() {
    super();
    this.audioRef = React.createRef(); // Create a reference to the audio element

    // Define your list of songs
    this.songs = [
      {
        title: 'Zelda Theme',
        artist: 'Zelda',
        audioFile: zeldaTheme,
        image: albumCover,
      },
      {
        title: 'Gerudo Valley',
        artist: 'Zelda',
        audioFile: gerudoValley,
        image: albumCover,
      },
      {
        title: 'Great Fairy Fountain',
        artist: 'Zelda',
        audioFile: greatFairy,
        image: albumCover,
      },
      // Add more songs here
    ];

    this.state = {
      currentSongIndex: 0, // Start with the first song
      isPlaying: false,
    };
  }

  togglePlayPause = () => {
    const audio = this.audioRef.current; // Get a reference to the audio element

    if (audio.paused) {
      audio.play()
        .then(() => {
          this.setState({ isPlaying: true });
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    } else {
      audio.pause();
      this.setState({ isPlaying: false });
    }
  };

  playNextSong = () => {
    const { currentSongIndex } = this.state;
    const nextIndex = (currentSongIndex + 1) % this.songs.length; // Calculate the next song index

    // Pause and reset the audio element
    const audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning

    // Load and play the next song
    audio.src = this.songs[nextIndex].audioFile;
    audio.load(); // Load the new audio source
    audio.play(); // Play the new song

    this.setState({
      currentSongIndex: nextIndex,
      isPlaying: true, // Start playback of the new song
    });
  };

  playPreviousSong = () => {
    const { currentSongIndex } = this.state;

    // Calculate the index of the previous song
    const previousIndex =
      currentSongIndex === 0 ? this.songs.length - 1 : currentSongIndex - 1;

    // Pause and reset the audio element
    const audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    // Load and play the previous song
    audio.src = this.songs[previousIndex].audioFile;
    audio.load();
    audio.play();

    // Update the component state
    this.setState({
      currentSongIndex: previousIndex,
      isPlaying: true,
    });
  };

  render() {
    const { currentSongIndex, isPlaying } = this.state;
    const currentSong = this.songs[currentSongIndex];
    const albumCoverClass = isPlaying ? 'rotate' : ''; // Conditional class for spinning

    return (
      <div className="songsphere">
        <div className="songsphere-header">
          {/* Display album cover with the "rotate" class */}
          <img
            src={currentSong.image}
            alt="Album Cover"
            className={`album-cover ${albumCoverClass}`}
          />

          {/* Display current song information */}
          <div className="music-info">
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>
          </div>
        </div>
        <div className="music-controls">
          <button onClick={this.playPreviousSong}>Previous</button> {/* "Previous" button */}
          <button onClick={this.togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={this.playNextSong}>Next</button>
        </div>
        <audio ref={this.audioRef} controls>
          <source src={currentSong.audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default Songsphere;
