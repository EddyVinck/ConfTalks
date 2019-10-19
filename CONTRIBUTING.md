# Contributing guidelines

ConfTalks is open for contributions. A contribution can be anything like a feature or just some conference talks added to the JSON files in `/client/data`.

## Your first GitHub contribution?

Awesome! If you don't know how it works you can refer to this [gist](https://gist.github.com/Chaser324/ce0505fbed06b947d962). If you prefer video you can check out [this video](https://www.youtube.com/watch?v=rgbCcBNZcdQ) explaining how it works.

### TL;DR

1. Fork this repository
2. Clone your forked repository to your machine and create a new branch to work on.
3. Follow the contributing guidelines
4. Commit and push to your forked version
5. Check if new commits were pushed to the original [master branch](https://github.com/EddyVinck/ConfTalks/tree/master). If you are behind on some commits, please merge the current version of the master branch into your fork https://help.github.com/en/articles/merging-an-upstream-repository-into-your-fork
6. Double check there are no duplicate IDs
7. When you're ready, visit your forked repository and click the button to create a pull request.

## Adding features

Before starting on a feature, please [open an issue](https://github.com/EddyVinck/ConfTalks/issues/new) first to start a discussion on the feature you would like to collaborate on or implement. It would be a shame to waste time on features that aren't going to get merged in.

## Adding talks

Most importantly: please make sure there are no duplicate IDs in your data. Please check if your talk, category, speaker or conference has been added already.

When adding dates to your data, please format them as `YYYY-MM-DD`. This means that the first of February 2019 would become `2019-02-01`.

Before submitting your pull request, please check if new commits were pushed to the original [master branch](https://github.com/EddyVinck/ConfTalks/tree/master). If you are behind on some commits, please merge the current version of the master branch into your fork. See: https://help.github.com/en/articles/merging-an-upstream-repository-into-your-fork.

### Conferences

You can find data in `client/data/conferences.json`.

```
{
  "conferences": {
    "0": {
      "name": "JSConf EU 2018",
      "start_date": "2018-06-02",
      "end_date": "2018-06-03",
      "locations": ["Arena Berlin. Eichenstraße 4, 12435 Berlin, Germany"]
    },
    "1": {
      "name": "JSConf EU 2019",
      "start_date": "2019-06-01",
      "end_date": "2019-06-02",
      "locations": ["Arena Berlin. Eichenstraße 4, 12435 Berlin, Germany"]
    },
    "<unique ID here>": {
      "name": "<[Conference name] [year]>",
      "start_date": "<Start date in format YYYY-MM-DD>",
      "end_date": "<End date>",
      "locations": ["Arena Berlin. Eichenstraße 4, 12435 Berlin, Germany"]
    }
  }
}
```

### Speakers

You can find data in `client/data/speakers.json`.

```
{
  "speakers": {
    "0": { "name": "Una Kravets" },
    "1": { "name": "Sher Minn Chong" },
    "2": { "name": "Ziran Sun" },
    "<unique ID here>": { "name": "<speaker first and last name>" },
  }
}
```

### Talk categories

You can find the data in `client/data/talk_categories.json`.

```
{
  "categories": {
    "0": { "name": "CSS" },
    "1": { "name": "JavaScript" },
    "2": {
      "name": "Front-end",
      "alternative_spelling": ["frontend", "front end"]
    },
    "<unique ID here>": {
      "name": "<category displayed name>",
      "alternative_spelling": [<Alternative ways of spelling the category>]
    },
  }
}
```

Make sure to keep the angled brackets for `"alternative_spelling"`.

### Talks

You can find data in `client/data/talks.json`.

```
{
  "talks": {
    "0": {
      "speakers": [0],
      "main_title": "CSS Houdini & The Future of Styling",
      "alternative_titles": [],
      "categories": [1],
      "video_url": "https://www.youtube.com/watch?v=GhRE3rML9t4",
      "video_upload_date": "2019-06-25",
      "conferences": [1]
    },
    "<unique ID here>": {
      "speakers": [<speaker ID(s)>],
      "main_title": "<displayed talk title>",
      "alternative_titles": [<alternative titles for the same talk at different conferences>],
      "categories": [<category ID(s)>],
      "video_url": "<youtube url, preferrably>",
      "video_upload_date": "<video upload date>",
      "conferences": [<conference ID(s)>]
    },
  }
}
```

Make sure to keep the angled brackets for `"speakers"`, `"alternative_titles"`, `"categories"` and `"conferences"`.
